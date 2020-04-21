import React, { useEffect } from 'react'

import { useStateApiData } from '../utils/data'
import { get, size, find } from 'lodash'



export default () => {
    const [api_state, data, getApiData] = useStateApiData()

    useEffect(() => {
        getApiData()
    }, [])

    // console.log("state wise data => ", data, api_state)

    let regions = get(data, "data.regional", [])

    /**
     * convert list in to label value format
     */
    const getRegionalList = () => {
        if (size(regions) === 0) return []

        let dropdownData = []

        regions.forEach(region => {
            let location = get(region, "loc", "")
            dropdownData.push({
                label: location,
                value: location
            })
        });
        return dropdownData
    }

    /**
     * get full details of region 
     * @param {String} value location dropdown value
     */
    const getRegionDetails = (value) => {
        return find(regions, (region) => region.loc === value)
    }

    return {
        api_state,
        summary: get(data, "data.summary", {}),
        getRegionalList,
        getRegionDetails
    }
}