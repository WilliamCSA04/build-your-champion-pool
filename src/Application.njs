import Nullstack from 'nullstack';

import './Application.scss';

class Application extends Nullstack {

  items = {}
  name = ""
  role = ""

  static async start({project}) {
    project.name = 'Faça sua champion pool';
    project.domain = 'nullstack.app';
    project.color = '#D22365';
  }

  prepare({project, page}) {
    page.title = `${project.name}`;
    page.locale = 'pt-BR';
  }

  renderForm() {
    return ( 
        <form onsubmit={() => {
          const previousList = this.items[this.role] || [];
          const sublist = [
            ...previousList,
            {
              name: this.name
            }
          ]
          this.items = { ...this.items, [this.role]: sublist }
        }}>
          <label>
            Nome
            <input name="name" bind={this.name} />
          </label>
          <label>
            Rota
            <input name="role" bind={this.role} />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      )
  }

  renderItems() {
    const allItems = Object.keys(this.items);
    if(allItems.length === 0) {
      return false
    }
    return (
      <ul>
        <h3>Campeões cadastrados</h3>
        {allItems.map((role) => {
          return (        
            <li>
              <ul>
                <h4>{role}</h4>
              {this.items[role].map(champion => (
                <li>
                  {champion.name}
                </li>
              ))}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  render({page}) {
    return (
      <main>
        <hgroup>
          <h1> {page.title} </h1>
          <h2>Informe seu campeão</h2>
        </hgroup>
        <Form />
        <Items />
      </main>
    )
  }

}

export default Application;