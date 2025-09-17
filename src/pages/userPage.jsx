import SideBar from "../features/sideBar/sideBar";
import User from "../features/user/user"

function UserPage() {
    return (
        <div>
             <SideBar>
                <User></User>
             </SideBar>
        </div>
    );
}

export default UserPage