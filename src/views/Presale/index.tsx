import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import RebaseTimer from "../../components/RebaseTimer";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./presale.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { includes } from "lodash";
declare const chain: string;

function Presale() {
    const dispatch = useDispatch();
    const { provider, address, connect, providerChainID, checkWrongNetwork } = useWeb3Context();

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const currentIndex = useSelector<IReduxState, string>(state => {
        return state.app.currentIndex;
    });
    const fiveDayRate = useSelector<IReduxState, number>(state => {
        return state.app.fiveDayRate;
    });
    const timeBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.time;
    });
    const memoBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.memo;
    });
    const stakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.time;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const setMax = () => {
        setQuantity("120");
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: providerChainID }));
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: providerChainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "time") return stakeAllowance > 0;
            return 0;
        },
        [stakeAllowance],
    );

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    const CoinGecko = require("coingecko-api");
    const CoinGeckoClient = new CoinGecko();
    async function func() {
        let data = await CoinGeckoClient.simple.price({
            ids: ["bitcoin"],
            vs_currencies: ["usd"],
        });
        console.log(data);
    }
    func();

    let chain_arr = [43114, 43113, 56, 97, 250, 4002, 137, 80001];

    if (address) {
        if (chain_arr.includes(providerChainID)) {
            if (providerChainID === 43114) {
                let chain: string = "avalanche";
                const options1 = ["MIM"];
                let defaultOption = options1[0];
            } else if (providerChainID === 43113) {
                let chain: string = "avalanche_test";
                const options1 = ["MIM"];
                let defaultOption = options1[0];
            } else if (providerChainID === 56) {
                let chain: string = "bsc";
                const options1 = ["BUSD"];
                let defaultOption = options1[0];
            } else if (providerChainID === 97) {
                let chai: string = "bsc_test";
                const options1 = ["BUSD"];
                let defaultOption = options1[0];
            } else if (providerChainID === 250) {
                let chain: string = "fantom";
                const options1 = ["DAI"];
                let defaultOption = options1[0];
            } else if (providerChainID === 4002) {
                let chain: string = "fantom_test";
                const options1 = ["DAI"];
                let defaultOption = options1[0];
            } else if (providerChainID === 137) {
                let chain: string = "polygon";
                const options1 = ["USDC"];
                let defaultOption = options1[0];
            } else if (providerChainID === 80001) {
                let chain: string = "polygon_tests";
                const options1 = ["USDC"];
                let defaultOption = options1[0];
            }
        } else {
            let chain: string = "null";
        }
    }

    const currentChainId = [providerChainID];
    const trimmedMemoBalance = trim(Number(memoBalance), 6);
    console.log(currentChainId);
    return (
        <div className="stake-view">
            <Zoom in={true}>
                <div className="stake-card">
                    <Grid className="stake-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="stake-card-header">
                                <p className="stake-card-header-title">Whitelisted Presale</p>
                                {/* <RebaseTimer /> */}
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="stake-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <div className="stake-card-apy">
                                            <p className="stake-card-metrics-title">Whitelisted Presale Price</p>
                                            <p className="stake-card-metrics-value">$10</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <div className="stake-card-index">
                                            <p className="stake-card-metrics-title">Public Launch STARSHIP Price</p>
                                            <p className="stake-card-metrics-value">$16.5</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="stake-card-area">
                            {!address && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">Connect your wallet to buy STARSHIP tokens!</p>
                                </div>
                            )}
                            {address && !chain_arr.includes(providerChainID) && (
                                <div className="stake-card-wallet-notification">
                                    <div className="stake-card-wallet-connect-btn" onClick={connect}>
                                        <p>Switch Network</p>
                                    </div>
                                    <p className="stake-card-wallet-desc-text">This network is not yet supported!</p>
                                </div>
                            )}
                            {address && chain_arr.includes(providerChainID) && (
                                <div>
                                    <div className="stake-card-action-area">
                                        <div className="stake-card-action-row">
                                            {currentChainId.includes(43114) && (
                                                <>
                                                    <Dropdown options={["MIM"]} className="stake-card-action-dropdown" value={"MIM"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(43113) && (
                                                <>
                                                    <Dropdown options={["MIM"]} className="stake-card-action-dropdown" value={"MIM"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(56) && (
                                                <>
                                                    <Dropdown options={["BUSD"]} className="stake-card-action-dropdown" value={"BUSD"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(97) && (
                                                <>
                                                    <Dropdown options={["BUSD"]} className="stake-card-action-dropdown" value={"BUSD"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(250) && (
                                                <>
                                                    <Dropdown options={["USDC"]} className="stake-card-action-dropdown" value={"USDC"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(4002) && (
                                                <>
                                                    <Dropdown options={["DAI"]} className="stake-card-action-dropdown" value={"DAI"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(137) && (
                                                <>
                                                    <Dropdown options={["DAI"]} className="stake-card-action-dropdown" value={"DAI"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                            {currentChainId.includes(80001) && (
                                                <>
                                                    <Dropdown options={["USDC"]} className="stake-card-action-dropdown" value={"USDC"} />
                                                    <OutlinedInput
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="stake-card-action-input"
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                        labelWidth={0}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <div className="stake-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder="Amount of STARSHIP"
                                                className="stake-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div onClick={setMax} className="stake-card-action-input-btn">
                                                            <p>Max</p>
                                                        </div>
                                                    </InputAdornment>
                                                }
                                            />

                                            {view === 0 && (
                                                <div className="stake-card-tab-panel">
                                                    {address && hasAllowance("time") ? (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "staking")) return;
                                                                onChangeStake("stake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "staking", "Buy STARSHIP")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="stake-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_purchase")) return;
                                                                onSeekApproval("starship");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_purchase", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="stake-card-action-help-text">
                                            {address && !hasAllowance("starship") && (
                                                <p>
                                                    Note: The "Approve" transaction is only needed when purchasing for the first time; subsequent purchasing only requires you to
                                                    perform the transaction.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Presale;
