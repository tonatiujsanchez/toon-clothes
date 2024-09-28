

// 20 => $20.00
export const currencyFormatMXN = ( value:number ):string => {

    const currency = value.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })

    return currency
}
