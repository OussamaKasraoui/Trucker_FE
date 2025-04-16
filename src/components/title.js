import Helmet from "react-helmet";
import React from "react";

export let TitleComponent = ({title}) => {
    var defaultTitle = '⚛️ oKSoft - SyndiKIT';
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};