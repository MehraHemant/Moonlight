"use client";
import React, { ReactNode } from 'react';

const Modal = ({ show, onClose, children }: {show: boolean, onClose: ()=>void, children: ReactNode}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"content"} onClick={e => e.stopPropagation()}>
        <div className={"header"}>
          <button className={"close-button"} onClick={onClose}>&times;</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
