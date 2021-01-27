import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function spinner() {
    return (
        <div>
            <div className="p-field p-col-12 p-md-12">
                <div className="custom-skeleton p-p-4">
                    <ul className="p-m-0 p-p-0 list-unstyled">
                        <li className="p-mb-3">
                            <div className="p-d-flex">
                                <Skeleton
                                    shape="circle"
                                    size="4rem"
                                    className="p-mr-2"
                                ></Skeleton>
                                <div style={{ flex: '1' }}>
                                    <Skeleton
                                        width="100%"
                                        className="p-mb-2"
                                    ></Skeleton>
                                    <Skeleton width="75%"></Skeleton>
                                </div>
                            </div>
                        </li>
                        <li className="p-mb-3">
                            <div className="p-d-flex">
                                <Skeleton
                                    shape="circle"
                                    size="4rem"
                                    className="p-mr-2"
                                ></Skeleton>
                                <div style={{ flex: '1' }}>
                                    <Skeleton
                                        width="100%"
                                        className="p-mb-2"
                                    ></Skeleton>
                                    <Skeleton width="75%"></Skeleton>
                                </div>
                            </div>
                        </li>
                        <li className="p-mb-3">
                            <div className="p-d-flex">
                                <Skeleton
                                    shape="circle"
                                    size="4rem"
                                    className="p-mr-2"
                                ></Skeleton>
                                <div style={{ flex: '1' }}>
                                    <Skeleton
                                        width="100%"
                                        className="p-mb-2"
                                    ></Skeleton>
                                    <Skeleton width="75%"></Skeleton>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="p-d-flex">
                                <Skeleton
                                    shape="circle"
                                    size="4rem"
                                    className="p-mr-2"
                                ></Skeleton>
                                <div style={{ flex: '1' }}>
                                    <Skeleton
                                        width="100%"
                                        className="p-mb-2"
                                    ></Skeleton>
                                    <Skeleton width="75%"></Skeleton>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
