import { Link } from "react-router-dom"
import ViewAllCard from "./ViewAllCardComp"




const ViewAllMovie=({movieData})=>{
return(

<div className="grid px-14 max-sm:px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
            {movieData.map((value, index) => (
              <Link key={index}>
                <ViewAllCard data={value} />
              </Link>
            ))}
          </div>


)}


export default ViewAllMovie;