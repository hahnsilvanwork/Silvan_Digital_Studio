import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkflowExample } from '../../src/components/services/WorkflowExample';

describe('local workflow demonstration', () => {
  it('requires review and never presents an unreviewed draft as approved', () => {
    render(<WorkflowExample locale="de" />);
    fireEvent.click(screen.getByRole('button', {name:'Bericht erstellen'}));
    expect(screen.getByRole('status')).toHaveTextContent('Entwurf bereit');
    fireEvent.click(screen.getByRole('button',{name:'Als geprüft markieren'}));
    expect(screen.getByRole('status')).toHaveTextContent('Geprüft');
    fireEvent.change(screen.getAllByRole('combobox')[0],{target:{value:'open'}});
    expect(screen.queryByRole('button',{name:'Als geprüft markieren'})).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Daten geändert');
  });
  it('makes missing information explicit and blocks approval until corrected', () => {
    render(<WorkflowExample locale="de" />);
    fireEvent.click(screen.getByRole('checkbox',{name:'Fehlende Zuständigkeit ausprobieren'}));
    fireEvent.click(screen.getByRole('button', {name:'Bericht erstellen'}));
    expect(screen.getByRole('status')).toHaveTextContent('Zuständigkeit fehlt');
    expect(screen.getByRole('button',{name:'Als geprüft markieren'})).toBeDisabled();
    fireEvent.click(screen.getByRole('button',{name:'Beispiel zurücksetzen'}));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.queryByRole('button',{name:'Als geprüft markieren'})).not.toBeInTheDocument();
  });
});
