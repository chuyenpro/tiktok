import React, { useState, useRef, useEffect } from 'react';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import Footer from './Footer';

import Toggle from './Toggle';
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

const UpLoad = () => {
  const [charNumber, setCharNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile]=useState(false)

  const [user, setUser] = useState({
    username: '',
    password: 'Bachquanghung@1911',
    videos: [],
    name: 'name 1',
    followers: 44,
    likes: 58,
    avatar: '',
    id: '1',
  });

  const [videoUploaded, setVideoUploaded] = useState('');
  useEffect(() => {
    fetch(`https://63fa02d9897af748dcc7907c.mockapi.io/account`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);

  const idUser = parseInt(localStorage.getItem('key'));



  useEffect(() => {
    const foundUser = users.find((user) => user.id == idUser);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [idUser, users]);


  const handleRecivedFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      setVideoUploaded(reader.result);
    };
  };


  const upload=useEffect(()=>{
    const updatedVideos=[...user.videos,'https://www.tiktok.com/@cunxinh_3/video/7199507255631465755?is_from_webapp=1']
    let updatedUser={
      ...user,videos:updatedVideos
    }
    
    fetch(`https://63fa02d9897af748dcc7907c.mockapi.io/account` + `/${idUser}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })

    setUserProfile(true)

  
  }, [user])
    
    



  const handleCharNumber = (event) => {
    const value = event.target.value;
    const num = value.length;
    setCharNumber(num);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('uploadContainer')}>
        <div className={cx('title')}>
          <div className={cx('bigTitle')}>T???i video l??n</div>
          <div className={cx('smallTitle')}>????ng video v??o t??i kho???n c???a b???n</div>
        </div>
        <div className={cx('uploadBody')}>
          {videoUploaded ? (
            <div
              style={{ background: `url(${videoUploaded})`, backgroundSize: 'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}
              className={cx('uploadFieldVideo')}
            ></div>
          ) : (
            <div className={cx('uploadField')}>
              <div className={cx('uploadIcon')}>
                <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"></img>
              </div>
              <div className={cx('uploadFieldBody')}>
                <div className={cx('uploadFieldTitle')}>
                  <div className={cx('uploadFieldBigTitle')}>Ch???n video ????? t???i l??n</div>
                  <div className={cx('uploadFieldSmallTitle uploadContent')}>Ho???c k??o v?? th??? t???p tin</div>
                </div>
                <div className={cx('uploadFieldContent')}>
                  <div className={cx('uploadContent')}>MP4 ho???c WebM</div>
                  <div className={cx('uploadContent')}>????? ph??n gi???i 720x1280 tr??? l??n</div>
                  <div className={cx('uploadContent')}>T???i ??a 30 ph??t</div>
                  <div className={cx('uploadContent')}>Nh??? h??n 2 GB</div>
                </div>
                <button className={cx('uploadBtn')}>
                  <input onChange={handleRecivedFile} type="file" id="upload" hidden />
                  <label htmlFor="upload">Ch???n t???p tin</label>
                </button>
              </div>
            </div>
          )}

          <div className={cx('adjustField')}>
            <div className={cx('fixField')}>
              <div className={cx('fixIcon')}>
                <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"></img>
              </div>
              <div className={cx('fixContent')}>
                <div className={cx('fieldTile')}>Chia video v?? ch???nh s???a</div>
                <div className={cx('fieldContent')}>
                  B???n c?? th??? nhanh ch??ng ph??n chia video th??nh nhi???u ph???n, lo???i b??? c??c ph???n th???a v?? chuy???n video ngang
                  th??nh video d???c
                </div>
              </div>
              <button className={cx('btn')}>Ch???nh s???a</button>
            </div>

            <div className={cx('noteField')}>
              <div className={cx('noteContent')}>
                <div className={cx('fieldTile')}>Ch?? th??ch</div>
                <div className={cx('numberOfChar')}>{charNumber}/150</div>
              </div>
              <div className={cx('inputNote')}>
                <input type="text" style={{ width: '100%' }} onChange={handleCharNumber}></input>
                <div>
                  <span className={cx('inputNoteChoice')}>@</span>
                  <span className={cx('inputNoteChoice')}>#</span>
                </div>
              </div>
            </div>

            <div className={cx('coverField')}>
              <div className={cx('fieldTile')}>???nh b??a</div>
              <div className={cx('cover')}></div>
            </div>

            <div className={cx('restrictField')}>
              <div className={cx('fieldTile')}>Ai c?? th??? xem video n??y</div>
              <select className={cx('restrictOption')}>
                <option className={cx('Option')}>C??ng khai</option>
                <option className={cx('Option')}>B???n b??</option>
                <option className={cx('Option')}>Ri??ng t??</option>
              </select>
            </div>

            <div className={cx('allow')}>
              <div className={cx('fieldTile')}>Cho ph??p ng?????i d??ng:</div>
              <div className={cx('allowChoices')}>
                <input type="checkbox" name="vehicle1" className={cx('checkbox1')}></input>
                <label htmlFor="vehicle1">B??nh lu???n</label>

                <input type="checkbox" name="vehicle1" className={cx('checkbox1')}></input>
                <label htmlFor="vehicle1">Duet</label>

                <input type="checkbox" name="vehicle1" className={cx('checkbox1')}></input>
                <label htmlFor="vehicle1">Stitch</label>
              </div>
            </div>

            <div className={cx('author')}>
              <div className={cx('authorHead')}>
                <div className={cx('fieldTile')}>Ch???y quy tr??nh ki???m tra b???n quy???n</div>
                <Toggle></Toggle>
              </div>
              <div className={cx('fieldContent')}>
                Ch??ng t??i s??? ki???m tra xem video c???a b???n c?? s??? d???ng ??m thanh vi ph???m b???n quy???n hay kh??ng. N???u ch??ng t??i
                ph??t hi???n c?? vi ph???m, b???n c?? th??? ch???nh s???a video tr?????c khi ????ng
              </div>
            </div>

            <div className={cx('buttons')}>
              <button className={cx('cancelBtn')}>H???y B???</button>
              {!userProfile?(<button className={cx('btn')} onClick={upload}>????ng</button>):(
                <Link to='/profile/:id' className={cx('btn')} onClick={upload}>????ng</Link>
              )}
              

            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpLoad;
