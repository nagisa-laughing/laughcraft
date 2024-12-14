import { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] py-4">{children}</h2>
)