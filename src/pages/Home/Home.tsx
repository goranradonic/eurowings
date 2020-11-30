import React, {useContext, useEffect, useState} from "react";
import {AppStoreContext} from "../../store/store";
import Header from "../../components/Header/Header";
import ImgurBox from "../../components/Imgur/Imgur";
import {ImGurArrayProps} from "../../store/use-app-io";
import {ReactComponent as IconFilterSVG} from "../../assets/svg/icon-filter.svg";
import ImgurFilters from "../../components/Imgur/ImgurFilters";
import cn from 'classnames'
import {ImgurFilterSection, ImgurFilterSort, ImgurFilterWindow} from "../../shared/types/ImgurTypes";

export type FilterProps = {
    section:ImgurFilterSection,
    sort: ImgurFilterSort,
    window: ImgurFilterWindow,
    showViral: boolean
}


export function Home() {
    const {io} = useContext(AppStoreContext);
    const [images, setImages] = React.useState<Array<ImGurArrayProps>>([]);
    const [showFilters, setShowFilters] = useState(false)
    const [filter, setFilter] = useState<FilterProps>({section:'hot', showViral: true, sort: 'viral', window: 'day'});

    // const onIsVisible = (index:number) => {
    //     if (index === images.length - 1) {
    //         setPage(page => page + 1);
    //     }
    // };


    useEffect(() => {
        io.getMembers(filter).then(res => {
            console.log(res.tag)
            if (res.tag === 'loaded') {
                setImages(res.data.data);

            }
        });

    }, [filter]);

    function changeSectionFilter(section:ImgurFilterSection){
        if(filter.sort === 'rising' && section !== 'user'){
            setFilter({...filter, sort: 'viral'})
        }
        setFilter({...filter, section: section})
    }

    return (
        <div className="eurowings">
            <Header/>
            <main id='app-content'>
                <div className="main-container">
                    <div className="main-container__wrap">
                        <div className="images">
                            <div className="images__header">
                                <div className="images__header--box">
                                    <span>60 images</span>
                                    <h3>imgur <span>API</span></h3>
                                </div>
                                <div className="images__header--box">
                                    <button type='button' onClick={() => setShowFilters(showFilters => !showFilters)}
                                            className={cn({'active': showFilters})}><IconFilterSVG/> filters
                                    </button>
                                </div>
                            </div>
                            <ImgurFilters showFilters={showFilters}
                                          sectionFilter={filter.section}
                                          showViral={filter.showViral}
                                          sortFilter={filter.sort}
                                          windowFilter={filter.window}
                                          changeSortFilter={(e)=>setFilter({...filter, sort: e})}
                                          changeSectionFilter={changeSectionFilter}
                                          changeWindowFilter={(e)=>setFilter({...filter, window: e})}
                                          changeShowViralFilter={v=>setFilter({...filter, showViral: v})}
                            />
                            <div className='images__container'>
                                {images && images.length === 0 && <div>loading...</div>}
                                {images && images.length>0 && images.map((image, index)=><ImgurBox key={index} thumb={image} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}