import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaBox, FaMapMarkerAlt } from "react-icons/fa";
import image from "../../assets/account.jpg";
import Address from "../../components/shopping-view/Address";
import ShoppingOrders from "../../components/shopping-view/Orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Account Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" alt="Account" />
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg">
          <Tabs>
            <TabList className="flex space-x-4 border-b pb-2">
              <Tab className="px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-white flex items-center space-x-2">
                <FaBox /> <span>Orders</span>
              </Tab>
              <Tab className="px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-white flex items-center space-x-2">
                <FaMapMarkerAlt /> <span>Address</span>
              </Tab>
            </TabList>

            <TabPanel>
              <ShoppingOrders />
            </TabPanel>
            <TabPanel>
              <Address />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;