import { useState } from 'react';

// import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '280px' }}>
            <div className="sweet-loading text-center">
                <HashLoader color='#000000' loading={loading} css='' size={80} />
            </div>
        </div>
    );
};

export default Loader;
