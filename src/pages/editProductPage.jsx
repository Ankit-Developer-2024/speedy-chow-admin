import { CreateEditProduct } from "../features/home/createEditProduct"; 
import SideBar from "../features/sideBar/sideBar"; 

export const EditProductPage = function () {
    return (
        <div>
             <SideBar>
                 <CreateEditProduct></CreateEditProduct>
             </SideBar>
        </div>
    );
}

