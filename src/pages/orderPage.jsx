import Order from "../features/order/order";
import SideBar from "../features/sideBar/sideBar"; 

export const OrderPage = function OrderPage() {
    return (
        <div>
             <SideBar>
                <Order></Order>
             </SideBar>
        </div>
    );
}
 