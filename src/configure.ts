//import {} from 'openrct2';

import { ManageStaff } from './act';

export class PluginConfig {
  configVersion: number;

  numberOfHandymen: number;
  handymanAutoZones: number;

  guards: number;
  guardAutoZones: number;

  entertainers: number;
  entertainerZones: number;

  mechanics: number;
  mechanicZones: number;

  constructor() {
    this.numberOfHandymen = 0;
    this.handymanAutoZones = 0;
    this.guards = 0;
    this.guardAutoZones = 0;
    this.entertainers = 0;
    this.entertainerZones = 0;
    this.mechanics = 0;
    this.mechanicZones = 0;
    this.configVersion = 1;
  }
}

export var myConfig: PluginConfig;

const pluginConfigPath: string = 'jcristy.staffmanager.config';

export function LoadConfig() {
  let possibleConfig: PluginConfig | undefined =
    context.sharedStorage.get(pluginConfigPath);
  if (!possibleConfig) {
    myConfig = new PluginConfig();
    save();
    return;
  }
  myConfig = possibleConfig;
}

function save() {
  context.sharedStorage.set(pluginConfigPath, myConfig);
}

let handle: Window | undefined;

export function OpenConfigureUI() {
  if (handle !== undefined) return;
  const layout: GridLayout = new GridLayout(6, 1, 224, 256);
  const widgets: Widget[] = [
    layout.DoMe({
      type: 'label',
      text: 'End the tedium! [VI]{version}[/VI]',
    }),
    layout.DoMe({
      type: 'textbox',
      text: myConfig.numberOfHandymen.toString(),
      onChange(text: string) {
        let value: number = Number(text);
        if (Number.isNaN(value)) {
          return;
        }
        myConfig.numberOfHandymen = value;
        save();
      },
    }),
    layout.DoMe({
      type: 'dropdown',
      items: ['None', 'Auto-basic'],
      onChange(index: number) {
        myConfig.handymanAutoZones = index;
        save();
      },
    }),
    layout.DoMe({
      type: 'button',
      text: 'Apply!',
      onClick() {
        if (handle != undefined) {
          handle.close(); // close the window to force reloading the values :-)
        }
        // Enact The Algorithms
        ManageStaff(myConfig);
      },
    }),
  ];
  handle = ui.openWindow({
    classification: 'staff-manager-configure',
    height: 256,
    width: 256,
    title: 'Staff Manager - Options',
    onClose() {
      handle = undefined;
    },
    widgets,
  });
}

interface WidgetSpec {
  X: number;
  Y: number;
  Height: number;
  Width: number;
}

class GridLayout {
  Rows: number;

  Columns: number;

  TotalHeight: number;

  TotalWidth: number;

  Margin: number;

  OffsetX: number;

  OffsetY: number;

  item: number; // for iterating

  constructor(
    rows: number,
    columns: number,
    totalHeight: number,
    totalWidth: number,
    margin: number = 5,
    offsetX: number = 0,
    offsetY: number = 10,
  ) {
    this.Rows = rows;
    this.Columns = columns;
    this.TotalHeight = totalHeight;
    this.TotalWidth = totalWidth;
    this.Margin = margin;
    this.OffsetX = offsetX;
    this.OffsetY = offsetY;
    this.item = -1;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DoMe(sparseWidget: any): any {
    const spec: WidgetSpec = this.Next();
    sparseWidget.x = spec.X;
    sparseWidget.y = spec.Y;
    sparseWidget.width = spec.Width;
    sparseWidget.height = spec.Height;
    return sparseWidget;
  }

  Next(): WidgetSpec {
    this.item++;
    return this.Here();
  }

  Here(): WidgetSpec {
    const row: number = this.item % this.Rows;
    const col: number = Math.floor(this.item / this.Rows);
    return this.Spot(row, col);
  }

  Spot(row: number, col: number): WidgetSpec {
    const usableHeight: number = this.TotalHeight - 2 * this.Margin;
    const usableWidth: number = this.TotalWidth - 2 * this.Margin;
    const cellHeight: number = usableHeight / this.Rows;
    const cellWidth: number = usableWidth / this.Columns;
    const toReturn: WidgetSpec = {
      X: this.OffsetX + this.Margin + col * cellWidth,
      Y: this.OffsetY + this.Margin + row * cellHeight,
      Height: cellHeight,
      Width: cellWidth,
    };
    return toReturn;
  }
}
