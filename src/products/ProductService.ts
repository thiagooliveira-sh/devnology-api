import { BadRequestException, Injectable } from '@nestjs/common';
import ProductSearchRequestDTO from './dto/request/ProductSearchRequestDTO';
import axios from 'axios';

@Injectable()
export class ProductService {

  async search(dto: ProductSearchRequestDTO): Promise<any[]> {
    const brUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
    const eurUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

    try {
      switch (dto.region) {
        case 'br': {
          const response = await axios.get(brUrl);
          return response.data.map(this.normalizeBrazilianProduct);
        }

        case 'eur': {
          const response = await axios.get(eurUrl);
          return response.data.map(this.normalizeEuropeanProduct);
        }

        case 'all': {
          const [brResponse, eurResponse] = await Promise.all([
            axios.get(brUrl),
            axios.get(eurUrl),
          ]);

          const brProducts = brResponse.data.map(this.normalizeBrazilianProduct);
          const eurProducts = eurResponse.data.map(this.normalizeEuropeanProduct);

          return [...brProducts, ...eurProducts];
        }

        default:
          throw new BadRequestException('Região inválida: deve ser "br", "eur" ou "all"');
      }
    } catch (error) {
      throw new BadRequestException('Erro ao buscar dados dos providers');
    }
  }

  private normalizeBrazilianProduct(product: any) {
    return {
      id: product.id,
      price: product.preco,
      name: product.nome,
      region: 'br',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQHMP_3aZCosuQ/feedshare-shrink_800/feedshare-shrink_800/0/1711113080304?e=1753315200&v=beta&t=AZvEh8Bhj1oyFqjLwT6geMF5jWyDZgDmrVmy-hjZNVw',
    };
  }

  private normalizeEuropeanProduct(product: any) {
    return {
      id: product.id,
      price: product.price,
      name: product.name,
      region: 'eur',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQHMP_3aZCosuQ/feedshare-shrink_800/feedshare-shrink_800/0/1711113080304?e=1753315200&v=beta&t=AZvEh8Bhj1oyFqjLwT6geMF5jWyDZgDmrVmy-hjZNVw',
    };
  }
}