import { AgreementCheckValue } from './Agreement'
import { IAgreementItem } from './AgreementItem'

/**
 * 대상에서 해당 id의 체크상태값 update
 * @param id 
 * @param checked 체크상태
 * @param values 대상
 * @returns id가 속하는 root(1depth level)까지 return
 */
export const updateItemById = (
  id: string,
  checked: boolean,
  values: AgreementCheckValue,
): AgreementCheckValue => {
  let object = {}

  if (Object.keys(values).includes(id)) {
    Object.assign(object, {
      [id]: updateAllByItems(checked, values[id] as AgreementCheckValue),
    })
  } else {
    Object.keys(values).forEach(key => {
      if (typeof values[key] !== 'boolean') {
        const result = updateItemById(
          id,
          checked,
          values[key] as AgreementCheckValue,
        )

        if (Object.keys(result).length > 0) {
          Object.assign(object, {
            [key]: Object.assign({}, values[key], result),
          })
        }
      }
    })
  }

  return object
}

/**
 * parameter로 받은 대상을 체크상태값으로 전부 update
 * @param checked 체크상태
 * @param values 대상
 * @returns 
 */
export const updateAllByItems = (checked: boolean, values: AgreementCheckValue) => {
  if (typeof values === 'boolean') {
    return checked
  } else {
    let object = {}
    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'boolean') {
        Object.assign(object, { [key]: checked })
      } else {
        Object.assign(object, {
          [key]: updateAllByItems(checked, values[key] as AgreementCheckValue),
        })
      }
    })

    return object
  }
}

/**
 * array to object
 * @param agreementItems 동의대상목록
 * @returns 
 */
export const agreementItemsToValueObject = (agreementItems: IAgreementItem[]) => {

  const convert = (list: IAgreementItem[]) => {
    let object = {}
    list.forEach((item: IAgreementItem) => {
      if (item?.children && item?.children.length > 0) {
        return Object.assign(object, { [item.id]: convert(item.children) })
      } else {
        Object.assign(object, { [item.id]: false })
      }
    })

    return object
  }

  return convert(agreementItems)
}