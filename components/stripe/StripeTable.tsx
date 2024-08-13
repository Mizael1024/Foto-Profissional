"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect } from "react";

interface StripePricingTableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  "pricing-table-id": string;
  "publishable-key": string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableProps;
    }
  }
}

type Props = {
  user: User;
};

const StripePricingTable = ({ user }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const stripePricingTable = process.env.STRIPE_PRICING_TABLE_ID as string;
  const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY as string;

  return (
    <div className="flex flex-1 flex-col w-full">
      <stripe-pricing-table
        pricing-table-id={stripePricingTable}
        publishable-key={stripePublishableKey}
        client-reference-id={user.id}
        customer-email={user.email}
      ></stripe-pricing-table>
    </div>
  );
};

export default StripePricingTable;
