import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import SDIcon from "../../../assets/icons/starshipDAO1.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import GlobeIcon from "../../../assets/icons/wonderglobe.svg";
import classnames from "classnames";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();
    const { bonds } = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("presale") >= 0 && page === "presale") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("mints") >= 0 && page === "mints") {
            return true;
        }
        if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
            return true;
        }
        if (currentPath.indexOf("bridge") >= 0 && page === "bridge") {
            return true;
        }
        if (currentPath.indexOf("swap") >= 0 && page === "swap") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="" target="_blank">
                    <img alt="" src={SDIcon} width="80px" />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} />
                            <p>Dashboard</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/presale"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "presale");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <p>🚀 Presale</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/calculator"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "calculator");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={GlobeIcon} />
                            <p>Calculator</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/stake"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "stake");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>Stake - Coming Soon</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/mints"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "mints");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>Bond - Coming Soon</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/lending"
                        // onClick={event => event.preventDefault()}
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "lending");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={BridgeIcon} /> */}
                            <p>Lending - Coming Soon</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/bridge"
                        // onClick={event => event.preventDefault()}
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "bridge");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={BridgeIcon} /> */}
                            <p>StarshipBridge - Coming Soon</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/swap"
                        // onClick={event => event.preventDefault()}
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "swap");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={BondIcon} /> */}
                            <p>StarshipSwap - Coming Soon</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="dapp-menu-doc-link">
                <Link href="https://docs.starshipdao.finance/" target="_blank">
                    <img alt="" src={DocsIcon} />
                    <p>Docs</p>
                </Link>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
