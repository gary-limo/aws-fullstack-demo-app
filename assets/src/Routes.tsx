import React from "react";
import { Route, Switch } from "react-router-dom";
import Checkout from "./modules/checkout/Checkout";
import CheckoutConfirm from "./modules/checkout/CheckoutConfirm";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import NotFound from "./modules/notFound/NotFound";
import Signup from "./modules/signup/Signup";
//import CategoryView from "./modules/category/CategoryView";
import ShoppingCart from "./modules/cart/ShoppingCart";
import PastPurchases from "./modules/pastPurchases/PastPurchases";
import BestSellers from "./modules/bestSellers/BestSellers";
import SearchView from "./modules/search/SearchView";
import PropsRoute from "./common/PropsRoute";
import SnowFlakeView from "./modules/category/pages/Snowflake";
import ComplianceView from "./modules/category/pages/Compliance";
import DataGovernanceView from "./modules/category/pages/DataGovernance";
import InfoDeliveryView from "./modules/category/pages/InfoDelivery";
import WhatsNextView from "./modules/category/pages/WhatsNext";
import RAGView from "./modules/category/pages/RAG";
import FAQView from "./modules/category/pages/FAQ";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

export const Routes: React.SFC<RouteProps> = (childProps) =>
  <Switch>
    <PropsRoute path="/" exact component={Home} props={childProps} />
    <PropsRoute path="/login" exact component={Login} props={childProps} />
    <PropsRoute path="/signup" exact component={Signup} props={childProps} />
    <Route path="/best" exact component={BestSellers} />
    <Route path="/cart" exact component={ShoppingCart} />
    <Route path="/category/SnowFlake" exact component={SnowFlakeView} />
    <Route path="/category/Compliance" exact component={ComplianceView} />
    <Route path="/category/Data-Governance" exact component={DataGovernanceView} />
    <Route path="/category/Info-Delivery" exact component={InfoDeliveryView} />
    <Route path="/category/Whats-Next" exact component={WhatsNextView} />
    <Route path="/category/RAG" exact component={RAGView} />
    <Route path="/category/FAQ" exact component={FAQView} />
    <Route path="/past" exact component={PastPurchases} />
    <Route path="/checkout" exact component={Checkout} />
    <Route path="/checkout-confirm" exact component={CheckoutConfirm} />
    <Route path="/search/:id" exact component={SearchView} />
    <Route component={NotFound} />
  </Switch>;