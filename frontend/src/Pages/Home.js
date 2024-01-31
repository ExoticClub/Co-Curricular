import Cookies from 'js-cookie';

function Home(){
    return(
        <>
        <div>
            <p>{Cookies.get('Account')}</p>
        </div>
        </>
    )
}

export default Home;