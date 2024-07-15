import React from 'react';

import { withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import { useExcalidrawElement } from '@udecode/plate-excalidraw';

export const ExcalidrawElement = withRef<typeof PlateElement>(
  ({ nodeProps, ...props }, ref) => {
    const { children, element } = props;

    const { Excalidraw, excalidrawProps } = useExcalidrawElement({
      element,
    });

    return (
      <PlateElement ref={ref} {...props}>
        <div contentEditable={false}>
          <div className="h-[600px]">
            {Excalidraw && (
              <Excalidraw {...nodeProps} {...(excalidrawProps as any)} />
            )}
          </div>
        </div>
        {children}
      </PlateElement>
    );
  }
);
