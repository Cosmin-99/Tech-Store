import React, { useState } from 'react';
type PropsType = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const LoadingImage = (p: PropsType) => {
    const [loaded, setLoaded] = useState(false);

    return <>
        <div style={{ width: "100%", height: "100%" }}>
            {!loaded && <img {...p} alt="Loading..." src={process.env.PUBLIC_URL + "/carousel-images/loading.gif"} >
            </img>}
            <img {...p} alt={p.alt ?? ""} onLoad={() => {
                setLoaded(true);
            }}></img>
        </div>
    </>
}