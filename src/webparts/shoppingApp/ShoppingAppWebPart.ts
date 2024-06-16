import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ShoppingAppWebPartStrings';
import ShoppingApp from './components/ShoppingApp';
import { IShoppingAppProps } from './components/IShoppingAppProps';
import { sp } from '@pnp/sp';

export interface IShoppingAppWebPartProps {
  description: string;
}

export default class ShoppingAppWebPart extends BaseClientSideWebPart<IShoppingAppWebPartProps> {

  protected async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context as any
    });
  }

  public render(): void {
    const element: React.ReactElement<IShoppingAppProps> = React.createElement(
      ShoppingApp,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
