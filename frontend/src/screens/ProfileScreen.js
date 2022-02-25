import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions/actionTypes'
import LoadingBox from "../components/loadingBox/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser, updateUserProfile } from "../store/actions/userActions";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const  { userInfo } = useSelector((state) => state.userSigninReducer);

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate} = useSelector(state => state.userUpdateProfile);    //destrucuting with renaming


  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        dispatch({type: actions.USER_UPDATE_PROFILE_FAIL, payload: 'passowrd no match'});
    } else {
        dispatch(updateUserProfile({ userId: user._id, name, email, password}));
        
    }
}

  const dispatch = useDispatch();
  useEffect(() => {
    if(!user){
        dispatch({ type: actions.USER_UPDATE_PROFILE_RESET })
        dispatch(detailsUser(userInfo._id));    //inja user details , hamoon too collectione user ro migirim az db az tarighe back end mizarim tu state'e khase uerDetails.
    } else{
        setName(user.name);
        setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);     //age inja user ro nazarim dependency, com render mishe miad tu useEffect > if(!user) > dobare render va dige tu useEffect nemiad ba inke bekhatere if(!user) state'e khase userDetails taghir karde. vali ma be in niaz darim ke age user taghir kard dobare useEffect run beshe o biad too else.
 
  
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          { loadingUpdate && <LoadingBox/>}
          {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant='success'>profile updated successfully</MessageBox>}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="text"
                placeholder="enter name"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                type="text"
                id="email"
                placeholder="enter email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                type="text"
                id="password"
                placeholder="enter password"
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
            <div> 
              <label htmlFor="confirmPassword">confirmPassword</label>
              <input
                type="text"
                id="confirmPassword"
                placeholder="enter confirmPassword"
                onChange={e=>setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
                <label/>
                <button className='primary' type='submit'>Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
