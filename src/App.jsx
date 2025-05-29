import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import NotFoundPage from "./Components/ReusableComponents/PageNotFound";
import Home from "./pages/HomePage";
import TheaterCard from "./pages/TheatrePage";
import MovieDetailComponent from "./Components/ReusableComponents/MovieDetailComponent";
import TheaterLayout from "./Components/ReusableComponents/Theaterlayout";
import TheaterBooking from "./Components/ReusableComponents/TheaterBooking";
import MovieBooking from "./Components/ReusableComponents/MovieBookingComponent";
import RegisterFormPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ResetPassword";
import AboutPage from "./Components/ReusableComponents/AboutPage";
import TermsAndConditions from "./Components/ReusableComponents/TermsandConditionPage";
import TicketConfirmation from "./pages/TicketConfirmationPage";
import NestedMovies from "./Components/ReusableComponents/MovieNestedComp";
import Kollywood from "./pages/Kollywoodpage";
import Tollywood from "./pages/TollywoodPage";
import Mollywood from "./pages/MollyWoodPage";
import PrivateRoute from "./Components/ReusableComponents/PrivateRouteComp";
import UserProfile from "./Components/ReusableComponents/ProfilePageComponent";
import MyTickets from "./Components/ReusableComponents/MyTicket";
import RazorpayComponent from "./Components/RazorpayComponent";
import EditProfile from "./Components/ReusableComponents/EditProfilePage";
import UserVotingPage from "./pages/UserVotingPage";
import FriendListComponent from "./Components/ReusableComponents/FriendListComponent"
import PrivacyPolicy from "./Components/ReusableComponents/PrivacyComponent";
import RefundPolicy from "./Components/ReusableComponents/RefundComponent";
import FriendListPage from "./pages/FriendListPage";



const AppRouter = () => {
    return (
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFoundPage/>} />
          <Route index element={<Home/>}/>
          <Route path="/theatre" element={<TheaterCard/>}/> 
          <Route path="/moviedetail/:_id" element={<MovieDetailComponent/>}/>
          <Route path="/theatrelayout" element={<TheaterLayout/>}/>
          <Route path="/theatrebooking/:_id" element={<TheaterBooking/>}/>
          <Route path="/moviebooking/:_id" element={<MovieBooking/>}/>
          <Route path="/register" element={<RegisterFormPage/>}/>
          <Route path="/resetpassword" element={<ForgotPassword/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/termsandcondition" element={<TermsAndConditions/>}/>
          <Route path="/voting/:_id" element={<UserVotingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          <Route path="/refund" element={<RefundPolicy/>}/>

          <Route path="movies" element={<NestedMovies/>}>
          <Route path="kollywood" element={<Kollywood />} />
          <Route path="tollywood" element={<Tollywood />} />
          <Route path="mollywood" element={<Mollywood />} />
          </Route>

          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/mytickets" element={<MyTickets/>}/>
          <Route path="/payment" element={<RazorpayComponent/>}/>
          <Route path="/confirmation" element={<TicketConfirmation/>}/>
          <Route path="/editprofile/:_id" element={<EditProfile/>}/>
          <Route path="/addfriend" element={<FriendListComponent/>}/>
          <Route path="/friends" element={<FriendListPage/>}/>
          </Route>
        </Routes>
        
        
    );
  };
  
  export default AppRouter;