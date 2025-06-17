import React from "react";

interface RulesCardProps {
    rule: any;
}

const RulesCard: React.FC<RulesCardProps> = ({ rule }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="flex justify-center items-center border border-gray-300 rounded-md p-2 h-fit w-fit">
                <span className="material-symbols-outlined">{rule.icon}</span>
            </span>
            <p>{rule.description}</p>
        </div>
    );
};

export default RulesCard;
