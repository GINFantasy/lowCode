/*
 * @Description: 视频组件
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-08-07 18:23:55
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-08-17 17:00:44
 */
function Video(props){
    const {className,style} = props;
    return <div {...props} src={null} style={style} className={`lc-vedio-ct ${className}`}>
        <video poster='' {...props} style={{}} className='lc-video'></video>
    </div>
}

export default Video