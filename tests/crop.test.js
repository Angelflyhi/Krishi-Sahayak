const { getCrops } = require('../backend/controllers/cropController');
const Crop = require('../backend/models/Crop');

jest.mock('../backend/models/Crop');

describe('cropController.getCrops', () => {
  it('returns filtered crops', async () => {
    const req = { query: { search: 'rice', season: 'Kharif', soil: 'Loamy' } };
    const json = jest.fn();
    const res = { json };
    const next = jest.fn();

    Crop.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ name: 'Rice' }]),
    });

    await getCrops(req, res, next);

    expect(Crop.find).toHaveBeenCalledWith({
      name: { $regex: 'rice', $options: 'i' },
      seasonality: 'Kharif',
      soil_type: 'Loamy',
    });
    expect(json).toHaveBeenCalledWith([{ name: 'Rice' }]);
  });
});
