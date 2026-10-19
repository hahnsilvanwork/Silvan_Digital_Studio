import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkflowExample } from '../../src/components/services/WorkflowExample';

describe('local workflow demonstration', () => {
  it('requires review and never presents an unreviewed draft as approved', () => {
    render(<WorkflowExample locale="de" />);
    fireEvent.click(screen.getByRole('button', {name:'Bericht erstellen'}));
    expect(screen.getByRole('status')).toHaveTextContent('Der Bericht ist bereit');
    fireEvent.click(screen.getByRole('button',{name:'Freigeben'}));
    expect(screen.getByRole('status')).toHaveTextContent('Freigegeben');
    fireEvent.change(screen.getAllByRole('combobox')[0],{target:{value:'open'}});
    expect(screen.queryByRole('button',{name:'Freigeben'})).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Aufgaben geändert');
  });
  it('makes missing information explicit and blocks approval until corrected', () => {
    render(<WorkflowExample locale="de" />);
    fireEvent.click(screen.getByRole('checkbox',{name:'Fehler ausprobieren: Aufgabe ohne zuständige Person'}));
    fireEvent.click(screen.getByRole('button', {name:'Bericht erstellen'}));
    expect(screen.getByRole('status')).toHaveTextContent('Zuständigkeit fehlt');
    expect(screen.getByRole('button',{name:'Freigeben'})).toBeDisabled();
    fireEvent.click(screen.getByRole('button',{name:'Beispiel zurücksetzen'}));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.queryByRole('button',{name:'Freigeben'})).not.toBeInTheDocument();
  });
});
