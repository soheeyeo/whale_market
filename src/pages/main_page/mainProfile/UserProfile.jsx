import RewardProfileHeader from "../../../components/main/RewardProfileHeader";
import UserProfileSection from '../../../components/main/mainProfile/user_profile/UserProfileSection';
import ProductSection from '../../../components/main/mainProfile/user_profile/ProductSection';
import Navbar from '../../../components/main/Navbar';


function UserProfile(){
    return(
        <>  
        <RewardProfileHeader />
        <UserProfileSection/>
        <ProductSection/>
        <Navbar/>
        </>
    )
}

export default UserProfile;