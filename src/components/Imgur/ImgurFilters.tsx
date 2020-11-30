import React, {FC} from "react";
import './styles.scss'
import cn from 'classnames'
import {ImgurFilterSection, ImgurFilterSort, ImgurFilterWindow} from "../../shared/types/ImgurTypes";


interface ImgurFiltersProps {
    showFilters: boolean,
    sortFilter: ImgurFilterSort,
    changeSortFilter: (sort: ImgurFilterSort) => void,
    sectionFilter: ImgurFilterSection,
    changeSectionFilter: (section: ImgurFilterSection) => void,
    windowFilter: ImgurFilterWindow,
    changeWindowFilter: (window: ImgurFilterWindow) => void,
    showViral: boolean;
    changeShowViralFilter: (v: boolean) => void
}

const ImgurFilters: FC<ImgurFiltersProps> = ({showFilters, sectionFilter, sortFilter, windowFilter, showViral, changeSortFilter, changeSectionFilter, changeWindowFilter, changeShowViralFilter}) => {

    const sections = ['hot', 'top', 'user'];
    const sorts = ['viral', 'top', 'time', 'rising'];
    const windows = ["day", "week", "month", "year", "all"]

    return (
        <div className={cn("imgur-filters", {"active": showFilters})}>
            <div className="imgur-filters__section">
                <h4>section</h4>
                <div className="imgur-filters__section--group">
                    <div className="imgur-filters__section--cta">
                        {sections.map((section, index) =>
                            <button
                                key={index}
                                onClick={() => changeSectionFilter(section as ImgurFilterSection)}
                                className={cn(
                                    {'active': sectionFilter === section}
                                )}>{section}
                            </button>
                        )}
                    </div>
                    {sectionFilter === 'user' && <label className='ew-checkbox'>
                        show viral images
                        <input type="checkbox" checked={showViral} onClick={() => changeShowViralFilter(!showViral)}/>
                        <div className="ew-checkbox__indicator"/>
                    </label>}
                </div>
            </div>
            <div className="imgur-filters__section">
                <h4>sort</h4>
                <div className="imgur-filters__section--cta">
                    {sorts.map((sort, index) =>
                        <button
                            key={index}

                            onClick={sectionFilter !== 'user' && sort === 'rising' ? () => {
                            } : () => changeSortFilter(sort as ImgurFilterSort)}
                            className={cn(
                                {'active': sortFilter === sort},
                                {'disable': sectionFilter !== 'user' && sort === 'rising'},
                            )}>
                            {sectionFilter !== 'user' && sort === 'rising' &&
                            <span className='tooltip'>only available with 'user' section</span>}
                            {sort}
                        </button>
                    )}
                </div>
            </div>
            {sectionFilter === 'top' && <div className="imgur-filters__section">
                <h4>window</h4>
                <div className="imgur-filters__section--cta">
                    {windows.map((window, index) => <button key={index}
                                                            onClick={() => changeWindowFilter(window as ImgurFilterWindow)}
                                                            className={cn({'active': windowFilter === window})}>{window}</button>)}
                </div>
            </div>}
        </div>
    )
}

export default ImgurFilters;