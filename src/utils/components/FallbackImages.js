import emptyBoard from 'assets/images/empty-board.svg';
import empty from 'assets/images/empty.svg';
import emptyCart from 'assets/images/empty-cart.svg';
import error from 'assets/images/error.svg';
import orders from 'assets/images/orders.svg';
import market from 'assets/images/market.svg';
import site from 'assets/images/no_delivery_site.svg';
import customer from 'assets/images/customer.svg';
import CleanUp from 'assets/images/clean_up.svg';

const FallbackImages = (severity) => {
    switch (severity) {
        case 'empty':
            return empty;
            break;
        case 'empty-cart':
            return emptyCart;
            break;
        case 'error':
            return error;
            break;
        case 'order':
            return orders;
            break;
        case 'market':
            return market;
            break;
        case 'site':
            return site;
            break;
        case 'customer':
            return customer;
            break;
        case 'schedules':
            return CleanUp;
            break;
        default:
            return emptyBoard;
    }
};
export default FallbackImages;
