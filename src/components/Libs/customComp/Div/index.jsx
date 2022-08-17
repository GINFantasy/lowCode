/*
 * @Description: div
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-08-17 16:04:39
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-08-17 17:00:40
 */
export default function Div(props){
    const { className } = props;
    return <div 
        {...props} 
        className={`lc-div ${className ? className : ''}`}
    />
}