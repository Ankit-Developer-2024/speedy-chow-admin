import { CreateProduct } from "../features/home/createProduct";
import SideBar from "../features/sideBar/sideBar"; 

export const CreateProductPage = function () {
    return (
        <div>
             <SideBar>
                 <CreateProduct></CreateProduct>
             </SideBar>
        </div>
    );
}

