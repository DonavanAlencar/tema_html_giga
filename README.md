# Sistema Gigantes - Protótipo Visual

## Carrossel Refatorado

O carrossel da seção hero foi completamente refatorado usando apenas HTML e JavaScript puro, sem dependências externas.

### Funcionalidades Implementadas

#### 🎯 **Controles Manuais**
- Botões de navegação (anterior/próximo) com ícones
- Indicadores clicáveis para navegação direta
- Design responsivo e moderno

#### 🔄 **Autoplay Inteligente**
- Troca automática de slides a cada 5 segundos
- Pausa automática quando o mouse está sobre o carrossel
- Reinicia o timer após interação manual

#### ⌨️ **Suporte a Teclado**
- Setas esquerda/direita para navegação
- Reinicia o autoplay após uso do teclado

#### 📱 **Suporte Touch**
- Swipe para esquerda: próximo slide
- Swipe para direita: slide anterior
- Detecção de gestos com threshold configurável

#### 🎨 **Animações Suaves**
- Transições CSS otimizadas
- Efeitos de hover nos controles
- Indicadores visuais dinâmicos

### Estrutura dos Arquivos

```
├── index.html          # HTML principal com estrutura do carrossel
├── carousel.js         # Classe Carousel refatorada
└── README.md          # Esta documentação
```

### Como Usar

O carrossel é inicializado automaticamente quando a página carrega. Para personalizar as configurações:

```javascript
// Exemplo de configuração personalizada
const carousel = new Carousel('#hero', {
    autoPlayDelay: 4000,        // 4 segundos entre slides
    transitionDuration: 800,    // 800ms de transição
    enableAutoPlay: true,       // Habilitar autoplay
    enableKeyboard: true,       // Habilitar teclado
    enableTouch: true,          // Habilitar touch
    enableIndicators: true      // Habilitar indicadores
});
```

### Compatibilidade

- ✅ Todos os navegadores modernos
- ✅ Dispositivos móveis (touch/swipe)
- ✅ Teclado (setas de navegação)
- ✅ Mouse (hover para pausar)

### Melhorias Implementadas

1. **Código Modular**: Classe Carousel separada em arquivo próprio
2. **Configurabilidade**: Opções flexíveis para personalização
3. **Performance**: Transições CSS otimizadas
4. **Acessibilidade**: Suporte completo a teclado
5. **Responsividade**: Controles adaptáveis a diferentes telas
6. **UX Aprimorada**: Feedback visual e interações intuitivas
