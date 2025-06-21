"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { Leaderboard } from "@/components/leaderboard";
import { TopMenu } from "@/components/topMenu";
import { ProgressChart } from "@/components/progressChart";

const Home: NextPage = () => {
    const [activeTab, setActiveTab] = useState('classement');

    return (
        <div className="w-full max-w-[600px] mx-auto">
            <TopMenu activeTab={activeTab} onTabChange={setActiveTab} />
            <div>
                {activeTab === 'classement' && <Leaderboard />}
                {activeTab === 'graphiques' && <ProgressChart />}
            </div>
        </div>
    );
};
export default Home;
