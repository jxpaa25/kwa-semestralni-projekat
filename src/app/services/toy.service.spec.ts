import { ToyService } from './toy.service';
import { toys } from '../../db/toys.db';

describe('ToyService', () => {
  const service = new ToyService();

  it('returns the full catalog', () => {
    expect(service.getToys()).toBe(toys);
    expect(service.getToys().length).toBeGreaterThan(0);
  });

  it('finds a toy by permalink', () => {
    const toy = service.getToyByPermalink(toys[3].permalink);
    expect(toy?.toyId).toBe(toys[3].toyId);
  });

  it('returns undefined for an unknown permalink', () => {
    expect(service.getToyByPermalink('ne-postoji')).toBeUndefined();
  });
});
