import React, { useEffect } from 'react';

import useAnalyticsInfo from './useAnalyticsInfo'

export default () => {

    const { api_state, summary, getRegionalList, getRegionDetails } = useAnalyticsInfo()

    console.log("api_state => ",api_state, "summary => ",summary,"list data => ",getRegionalList(),"single region=> ",getRegionDetails("Gujarat"))

    return (
        <div>This is Analytics page</div>
    )
}