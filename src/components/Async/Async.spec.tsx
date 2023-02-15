import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { Async } from ".";

describe("Async", () => {
  it('it renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    // PRIMEIRA MANEIRA PARA TESTAR (MAS SÓ PARA VER SE ALGUM COMPONENTE APARECEU EM TELA)
    // expect(await screen.findByText('Button')).toBeInTheDocument();

    // SEGUNDA MANEIRA PARA TESTAR
    // await waitFor(() => {
    //   expect(screen.getByText('Button')).toBeInTheDocument();
    // })

    // TERCEIRA MANEIRA PARA TESTAR
    await waitForElementToBeRemoved(screen.queryByText('Button'));
  })
});