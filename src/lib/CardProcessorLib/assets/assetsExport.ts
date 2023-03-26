import { CreditCardProcessorCardBrandId } from "../types/types";

export const assetLogoFilledMap: {[key in CreditCardProcessorCardBrandId]: any} = {
    "american-express": require('./americanExpressFilled.jpg'),
    default: require('./defaultFilled.jpg'),
    "diners-club": require('./dinersClubFilled.jpg'),
    discover: require('./discoverFilled.jpg'),
    elo: require('./eloFilled.jpg'),
    hiper: require('./hiperFilled.jpg'),
    hipercard: require('./hipercardFilled.jpg'),
    jcb: require('./jcbFilled.jpg'),
    maestro: require('./maestroFilled.jpg'),
    mastercard: require('./mastercardFilled.jpg'),
    mir: require('./mirFilled.jpg'),
    unionpay: require('./unionpayFilled.jpg'),
    rupay: require('./rupayFilled.jpg'),
    visa: require('./visaFilled.jpg')
}

// export const assetImgMap: {[key in CreditCardProcessorCardBrandId]: any} = {
//     "american-express": require('./americanExpress.jpg'),
//     default: require('./default.jpg'),
//     "diners-club": require('./dinersClub.jpg'),
//     discover: require('./discover.jpg'),
//     elo: require('./elo.jpg'),
//     hiper: require('./hiper.jpg'),
//     hipercard: require('./hipercard.jpg'),
//     jcb: require('./jcb.jpg'),
//     maestro: require('./maestro.jpg'),
//     mastercard: require('./mastercard.jpg'),
//     mir: require('./mir.jpg'),
//     unionpay: require('./unionpay.jpg'),
//     rupay: require('./rupay.jpg'),
//     visa: require('./visa.jpg')
// }