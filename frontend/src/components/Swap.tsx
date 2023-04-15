import React from "react";

const Swap = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-[60vw] h-[60vh] shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Swap</h2>
                <div className="divider"></div>
                <label className="input-group flex justify-center">
                    <input type="text" placeholder="0.01" className="input input-bordered" />
                    <select className="select select-bordered">
                        <option disabled selected>ETH </option>
                        <option>T-shirts</option>
                        <option>Mugs</option>
                    </select>
                </label>
                <label className="input-group flex justify-center">
                    <input type="text" placeholder="0.01" className="input input-bordered" />
                    <select className="select select-bordered">
                        <option disabled selected>ETH </option>
                        <option>T-shirts</option>
                        <option>Mugs</option>
                    </select>
                </label>
                <div className="divider"></div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Swap</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Swap;