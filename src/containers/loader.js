import Loader from "react-loader-spinner";
import './styles.css';

const LoaderComp = ()=>{
    return(
        //used to display the loader when the api is fetching data
        <div className='app'>
            <Loader
            type="Circles"
            color="white"
            height={100}
            width={200}
            timeout={3000}
            />
        </div>
    );
}
export default LoaderComp