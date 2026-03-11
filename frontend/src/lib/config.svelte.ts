import { gql } from 'urql';
import { client } from './graphqlClient';

const AGENT_ENABLED_QUERY = gql`
  query AgentEnabled {
    agentEnabled
  }
`;

class ConfigStore {
  agentEnabled = $state(true);

  async load(): Promise<void> {
    const result = await client.query(AGENT_ENABLED_QUERY, {}).toPromise();
    if (result.error) {
      console.warn('Failed to load config:', result.error.message);
      return;
    }
    if (result.data) {
      this.agentEnabled = result.data.agentEnabled;
    }
  }
}

export const configStore = new ConfigStore();
