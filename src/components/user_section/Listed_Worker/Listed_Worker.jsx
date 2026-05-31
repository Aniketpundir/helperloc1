import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PageHeader from "./PageHeader/PageHeader"
import FilterBar from "./FilterBar/FilterBar"
import WorkerGrid from "./WorkerGrid/WorkerGrid"
import {
    fetchListedWorkers,
    setListedWorkerFilter,
} from "../../../Redux/Slice/listedWorkerSlice"

const Listed_Worker = () => {
    const dispatch = useDispatch()
    const { category } = useParams()
    const { filters, page } = useSelector((state) => state.listedWorkers)

    useEffect(() => {
        if (category) {
            dispatch(setListedWorkerFilter({ serviceType: category.toLowerCase() }))
        }
    }, [category, dispatch])

    useEffect(() => {
        dispatch(fetchListedWorkers())
    }, [dispatch, filters, page])

    return (
        <>
            <PageHeader />
            <FilterBar />
            <WorkerGrid />
        </>
    )
}

export default Listed_Worker
