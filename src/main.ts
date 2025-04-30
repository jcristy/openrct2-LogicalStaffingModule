import { OpenConfigureUI, LoadConfig} from './configure';

const main = (): void => {
  LoadConfig();

  // Set up UI
  ui.registerMenuItem('Manage Staff', () => {
    OpenConfigureUI();
  });
};

// Day's check for staff to name
/*const daySubscription =*/
context.subscribe('interval.day', () => {});

export default main;
