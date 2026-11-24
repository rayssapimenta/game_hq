/* ==========================================================================
       CATÁLOGO DE PRODUTOS
       ========================================================================== */
    const PRODUCTS_CATALOG = [
      {
        id: 1,
        name: "PC Gamer Ares G1",
        category: "PC Gamer",
        price: 5499.00,
        oldPrice: 6499.00,
        badgeType: "offer",
        badgeText: "-15% OFF",
        shortSpecs: "Intel Core i7 • RTX 4060 8GB • 16GB DDR4 • SSD 1TB",
        fullDescription:
          "Computador montado e testado para jogos competitivos em Full HD e Quad HD com altas taxas de quadros e refrigeração silenciosa.",
        specsList: [
          "Processador: Intel Core i7-12700F (12 núcleos)",
          "Placa de Vídeo: NVIDIA GeForce RTX 4060 8GB GDDR6",
          "Memória RAM: 16GB DDR4 3200MHz (Dual Channel)",
          "Armazenamento: SSD NVMe 1TB de alta velocidade",
          "Fonte: 650W 80 Plus Bronze com PFC Ativo"
        ],
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        name: "PC Gamer Aura R5",
        category: "PC Gamer",
        price: 4290.00,
        oldPrice: null,
        badgeType: "stock",
        badgeText: "EM ESTOQUE",
        shortSpecs: "AMD Ryzen 5 5600 • RTX 3060 12GB • 16GB RAM • SSD 512GB",
        fullDescription:
          "Excelente equilíbrio entre custo e desempenho para rodar os principais lançamentos, transmissões e tarefas diárias sem engasgos.",
        specsList: [
          "Processador: AMD Ryzen 5 5600 (6 núcleos / 12 threads)",
          "Placa de Vídeo: NVIDIA GeForce RTX 3060 12GB",
          "Memória RAM: 16GB DDR4 3200MHz",
          "Armazenamento: SSD NVMe 512GB",
          "Gabinete: Lateral em vidro temperado com 3 ventoinhas"
        ],
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        name: "Notebook Zephyrus Pro 15",
        category: "Notebooks",
        price: 6890.00,
        oldPrice: null,
        badgeType: "stock",
        badgeText: "EM ESTOQUE",
        shortSpecs: "Core i7 13ª Ger • RTX 4060 • 16GB DDR5 • Tela 15.6\" 165Hz",
        fullDescription:
          "Notebook de alta performance com chassi fino e robusto, ideal para quem precisa de mobilidade nos estudos, trabalho e jogos.",
        specsList: [
          "Processador: Intel Core i7-13620H",
          "Placa Gráfica: NVIDIA RTX 4060 Laptop GPU",
          "Tela: 15.6\" Full HD IPS 165Hz antirreflexo",
          "Memória e Disco: 16GB DDR5 + SSD NVMe 1TB",
          "Teclado: Retroiluminado padrão ABNT2"
        ],
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        name: "Notebook Orion Work & Study 14",
        category: "Notebooks",
        price: 3590.00,
        oldPrice: 3990.00,
        badgeType: "offer",
        badgeText: "ÚLTIMAS UNIDADES",
        shortSpecs: "Ryzen 7 • 16GB RAM • SSD 512GB • Tela 14\" Full HD",
        fullDescription:
          "Leve, silencioso e com bateria de longa duração para produtividade diária, faculdade, escritório e programação.",
        specsList: [
          "Processador: AMD Ryzen 7 5700U",
          "Memória RAM: 16GB DDR4",
          "Armazenamento: SSD NVMe 512GB",
          "Tela: 14\" Full HD IPS com bordas finas",
          "Peso: 1,45 kg com carregamento rápido USB-C"
        ],
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 5,
        name: "Smartphone Nexus 7 Pro 5G",
        category: "Smartphones",
        price: 2799.00,
        oldPrice: 3290.00,
        badgeType: "offer",
        badgeText: "-15% OFF",
        shortSpecs: "256GB • 12GB RAM • Tela AMOLED 120Hz • Bateria 5000mAh",
        fullDescription:
          "Smartphone rápido com tela fluida de 120Hz, sistema de refrigeração interna para jogos mobile e câmera principal de 50MP.",
        specsList: [
          "Armazenamento e Memória: 256GB UFS 3.1 + 12GB RAM",
          "Tela: 6.7\" AMOLED Full HD+ 120Hz",
          "Conectividade: 5G Dual SIM, Wi-Fi 6 e NFC",
          "Bateria: 5000mAh com carregador rápido de 67W incluso",
          "Câmera Principal: 50MP com estabilização óptica (OIS)"
        ],
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 6,
        name: "Smartphone Core S24 Ultra Edition",
        category: "Smartphones",
        price: 4590.00,
        oldPrice: null,
        badgeType: "stock",
        badgeText: "EM ESTOQUE",
        shortSpecs: "512GB • 12GB RAM • Processador Octa-Core • Câmera 200MP",
        fullDescription:
          "Desempenho de ponta para fotografia, edição de vídeos, multitarefa intensa e jogos em qualidade máxima.",
        specsList: [
          "Armazenamento: 512GB interno",
          "Memória RAM: 12GB LPDDR5X",
          "Tela: 6.8\" QHD+ 120Hz com proteção Gorilla Glass",
          "Resistência: Certificação IP68 contra água e poeira",
          "Garantia: 12 meses nacional com nota fiscal"
        ],
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 7,
        name: "Console PlayStation 5 Slim 1TB",
        category: "Jogos & Consoles",
        price: 3799.00,
        oldPrice: null,
        badgeType: "stock",
        badgeText: "EM ESTOQUE",
        shortSpecs: "SSD 1TB • Leitor de Disco • Controle Sem Fio DualSense",
        fullDescription:
          "Experimente carregamentos ultrarrápidos com SSD de 1TB, resposta tátil imersiva e gráficos em 4K até 120fps.",
        specsList: [
          "Armazenamento: SSD integrado de 1TB",
          "Resolução: Suporte a saída 4K e Ray Tracing",
          "Conteúdo da caixa: Console, 1 Controle DualSense, cabo HDMI 2.1",
          "Mídia: Leitor de Blu-ray Ultra HD acoplado",
          "Garantia: 1 ano oficial no Brasil"
        ],
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 8,
        name: "Controle Pro Wireless & Kit Jogos",
        category: "Jogos & Consoles",
        price: 489.00,
        oldPrice: 579.00,
        badgeType: "offer",
        badgeText: "ÚLTIMAS UNIDADES",
        shortSpecs: "Bluetooth / USB-C • Gatilhos Analógicos • PC e Console",
        fullDescription:
          "Controle ergonômico de baixa latência compatível com PC Windows, notebooks e consoles, acompanhado de suporte de mesa.",
        specsList: [
          "Conexão: Wireless 2.4GHz, Bluetooth 5.0 e cabo USB-C",
          "Bateria: Autonomia de até 25 horas contínuas",
          "Compatibilidade: PC (Windows 10/11), Android e Consoles",
          "Sensores: Gatilhos lineares de alta precisão",
          "Incluso: Cabo trançado de 2m e receptor USB"
        ],
        image: "https://images.unsplash.com/photo-1592840496694-26d035b52b06?auto=format&fit=crop&w=800&q=80"
      }
    ];

    /* ==========================================================================
       ESTADO DA APLICAÇÃO
       ========================================================================== */
    let activeCategory = "Todos";
    let searchQuery = "";
    let cart = []; // [{ productId, quantity }]
    let activeCoupon = null; // "GAME10" -> 10% desconto

    /* ==========================================================================
       UTILITÁRIOS DE FORMATAÇÃO E NOTIFICAÇÃO
       ========================================================================== */
    function formatCurrencyBRL(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }

    function showToast(message) {
      const toastEl = document.getElementById("actionToast");
      const toastMsgEl = document.getElementById("toastMessage");
      toastMsgEl.textContent = message;
      const toastInstance = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2600 });
      toastInstance.show();
    }

    /* ==========================================================================
       RENDERIZAÇÃO DO CATÁLOGO E FILTROS EM TEMPO REAL
       ========================================================================== */
    function renderProducts() {
      const gridEl = document.getElementById("productsGrid");
      const emptyEl = document.getElementById("emptyProductsState");
      const counterEl = document.getElementById("productsCounterText");

      const normalizedSearch = searchQuery.trim().toLowerCase();

      const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
        const matchesCategory =
          activeCategory === "Todos" || product.category === activeCategory;

        const matchesText =
          normalizedSearch === "" ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.shortSpecs.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

        return matchesCategory && matchesText;
      });

      counterEl.textContent =
        filteredProducts.length === 1
          ? "Exibindo 1 produto"
          : `Exibindo ${filteredProducts.length} produtos`;

      if (filteredProducts.length === 0) {
        gridEl.innerHTML = "";
        emptyEl.classList.remove("d-none");
        return;
      }

      emptyEl.classList.add("d-none");

      gridEl.innerHTML = filteredProducts
        .map((product) => {
          const badgeClass = product.badgeType === "offer" ? "badge-offer" : "badge-stock";
          const oldPriceMarkup = product.oldPrice
            ? `<div class="small text-muted text-decoration-line-through">${formatCurrencyBRL(product.oldPrice)}</div>`
            : `<div class="small text-muted">À vista ou parcelado</div>`;

          return `
            <div class="col-12 col-sm-6 col-lg-3">
              <article class="ghq-product-card">
                <div class="ghq-product-img-wrap">
                  <span class="${badgeClass} position-absolute top-0 end-0 m-2.5 shadow-sm">
                    ${product.badgeText}
                  </span>
                  <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x400/0B0E14/FFFFFF?text=GAME+HQ';"
                  />
                </div>

                <div class="p-3.5 d-flex flex-column flex-grow-1 justify-content-between">
                  <div>
                    <div class="small fw-semibold mb-1" style="color: #0055FF;">
                      ${product.category}
                    </div>
                    <h3 class="h6 fw-bold mb-2" style="color: #0B0E14;">
                      ${product.name}
                    </h3>
                    <div class="ghq-specs-box mb-3">
                      ${product.shortSpecs}
                    </div>
                  </div>

                  <div>
                    <div class="mb-3">
                      ${oldPriceMarkup}
                      <div class="fs-5 fw-bold" style="color: #0B0E14;">
                        ${formatCurrencyBRL(product.price)}
                      </div>
                    </div>

                    <div class="d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-ghq-green btn-sm py-2"
                        onclick="addToCart(${product.id})"
                      >
                        Adicionar ao Carrinho
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm py-1.5 fw-medium"
                        style="border-radius: 0.5rem;"
                        onclick="openQuickDetails(${product.id})"
                      >
                        Detalhes Rápidos
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          `;
        })
        .join("");
    }

    /* ==========================================================================
       MODAL DE DETALHES RÁPIDOS
       ========================================================================== */
    function openQuickDetails(productId) {
      const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (!product) return;

      const modalTitle = document.getElementById("productModalTitle");
      const modalBody = document.getElementById("productModalBody");

      modalTitle.textContent = product.name;

      const specsItems = product.specsList
        .map((spec) => `<li class="mb-1.5">${spec}</li>`)
        .join("");

      const badgeClass = product.badgeType === "offer" ? "badge-offer" : "badge-stock";

      modalBody.innerHTML = `
        <div class="row g-4 align-items-center">
          <div class="col-md-5">
            <div class="rounded-3 overflow-hidden border" style="background-color: #F8F9FA;">
              <img
                src="${product.image}"
                alt="${product.name}"
                class="w-100"
                style="height: 240px; object-fit: cover;"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/0B0E14/FFFFFF?text=GAME+HQ';"
              />
            </div>
          </div>
          <div class="col-md-7">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="${badgeClass}">${product.badgeText}</span>
              <span class="small fw-semibold" style="color: #0055FF;">${product.category}</span>
            </div>
            <p class="text-muted small mb-3">${product.fullDescription}</p>
            <h4 class="h6 fw-bold mb-2" style="color: #0B0E14;">Ficha Técnica Completa:</h4>
            <ul class="small ps-3 mb-3" style="color: #1F2937;">
              ${specsItems}
            </ul>
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top">
              <div>
                ${
                  product.oldPrice
                    ? `<span class="small text-muted text-decoration-line-through d-block">${formatCurrencyBRL(product.oldPrice)}</span>`
                    : ""
                }
                <span class="fs-4 fw-bold" style="color: #0B0E14;">${formatCurrencyBRL(product.price)}</span>
              </div>
              <button
                type="button"
                class="btn btn-ghq-green px-4 py-2"
                data-bs-dismiss="modal"
                onclick="addToCart(${product.id})"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      `;

      const modalInstance = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("productDetailModal")
      );
      modalInstance.show();
    }

    /* ==========================================================================
       GERENCIAMENTO DO CARRINHO DE COMPRAS INTERATIVO
       ========================================================================== */
    function addToCart(productId) {
      const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (!product) return;

      const existingItem = cart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ productId, quantity: 1 });
      }

      document.getElementById("checkoutFeedback").classList.add("d-none");
      updateCartUI();
      showToast(`${product.name} adicionado ao carrinho.`);
    }

    function updateCartQuantity(productId, delta) {
      const itemIndex = cart.findIndex((item) => item.productId === productId);
      if (itemIndex === -1) return;

      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }

      updateCartUI();
    }

    function removeFromCart(productId) {
      cart = cart.filter((item) => item.productId !== productId);
      updateCartUI();
    }

    function updateCartUI() {
      const badgeEl = document.getElementById("cartBadgeCount");
      const itemsContainer = document.getElementById("cartItemsContainer");
      const subtotalEl = document.getElementById("cartSubtotal");
      const discountRowEl = document.getElementById("discountRow");
      const discountEl = document.getElementById("cartDiscount");
      const totalEl = document.getElementById("cartTotal");
      const checkoutBtn = document.getElementById("checkoutBtn");

      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      badgeEl.textContent = totalQuantity;

      if (cart.length === 0) {
        itemsContainer.innerHTML = `
          <div class="text-center py-5 px-3">
            <p class="fw-semibold mb-1" style="color: #0B0E14;">Seu carrinho está vazio</p>
            <p class="small text-muted mb-0">
              Adicione computadores, notebooks, smartphones ou jogos do catálogo para continuar.
            </p>
          </div>
        `;
        subtotalEl.textContent = "R$ 0,00";
        discountRowEl.classList.add("d-none");
        totalEl.textContent = "R$ 0,00";
        checkoutBtn.disabled = true;
        return;
      }

      let subtotal = 0;

      itemsContainer.innerHTML = cart
        .map((item) => {
          const product = PRODUCTS_CATALOG.find((p) => p.id === item.productId);
          if (!product) return "";
          const itemTotal = product.price * item.quantity;
          subtotal += itemTotal;

          return `
            <div class="d-flex gap-3 pb-3 mb-3 border-bottom align-items-center">
              <img
                src="${product.image}"
                alt="${product.name}"
                class="rounded-2 border flex-shrink-0"
                style="width: 64px; height: 64px; object-fit: cover;"
                onerror="this.onerror=null;this.src='https://placehold.co/120x120/0B0E14/FFFFFF?text=GHQ';"
              />
              <div class="flex-grow-1 min-w-0">
                <div class="fw-bold small text-truncate" style="color: #0B0E14;">
                  ${product.name}
                </div>
                <div class="small text-muted mb-2">
                  ${formatCurrencyBRL(product.price)} cada
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="btn-group btn-group-sm" role="group" aria-label="Alterar quantidade">
                    <button
                      type="button"
                      class="btn btn-outline-secondary px-2"
                      onclick="updateCartQuantity(${product.id}, -1)"
                      aria-label="Diminuir quantidade"
                    >−</button>
                    <span class="btn btn-light disabled fw-bold text-dark px-2.5">${item.quantity}</span>
                    <button
                      type="button"
                      class="btn btn-outline-secondary px-2"
                      onclick="updateCartQuantity(${product.id}, 1)"
                      aria-label="Aumentar quantidade"
                    >+</button>
                  </div>

                  <button
                    type="button"
                    class="btn btn-link btn-sm text-decoration-none p-0 fw-semibold"
                    style="color: #EF4444;"
                    onclick="removeFromCart(${product.id})"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      let discountValue = 0;
      if (activeCoupon === "GAME10") {
        discountValue = subtotal * 0.1;
        discountRowEl.classList.remove("d-none");
        discountEl.textContent = `- ${formatCurrencyBRL(discountValue)}`;
      } else {
        discountRowEl.classList.add("d-none");
      }

      const finalTotal = Math.max(0, subtotal - discountValue);

      subtotalEl.textContent = formatCurrencyBRL(subtotal);
      totalEl.textContent = formatCurrencyBRL(finalTotal);
      checkoutBtn.disabled = false;
    }

    /* ==========================================================================
       INICIALIZAÇÃO DE EVENTOS DOM
       ========================================================================== */
    document.addEventListener("DOMContentLoaded", () => {
      // Ano dinâmico no rodapé
      document.getElementById("currentYear").textContent = new Date().getFullYear();

      // Renderização inicial
      renderProducts();
      updateCartUI();

      // Eventos nos botões de categoria
      const filterButtons = document.querySelectorAll(".ghq-filter-btn");
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          activeCategory = btn.getAttribute("data-category");
          renderProducts();
        });
      });

      // Busca em tempo real
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", (event) => {
        searchQuery = event.target.value;
        renderProducts();
      });

      // Botão de limpar filtros no estado vazio
      document.getElementById("resetFiltersBtn").addEventListener("click", () => {
        activeCategory = "Todos";
        searchQuery = "";
        searchInput.value = "";
        filterButtons.forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-category") === "Todos");
        });
        renderProducts();
      });

      // Aplicar cupom de desconto (GAME10)
      document.getElementById("applyCouponBtn").addEventListener("click", () => {
        const couponInput = document.getElementById("couponInput");
        const feedbackEl = document.getElementById("couponFeedback");
        const code = couponInput.value.trim().toUpperCase();

        if (code === "GAME10") {
          activeCoupon = "GAME10";
          feedbackEl.textContent = "Cupom GAME10 aplicado com sucesso (10% de desconto).";
          feedbackEl.style.color = "#10B981";
        } else if (code === "") {
          activeCoupon = null;
          feedbackEl.textContent = "Digite um código de cupom válido (ex: GAME10).";
          feedbackEl.style.color = "#EF4444";
        } else {
          activeCoupon = null;
          feedbackEl.textContent = "Cupom inválido. Utilize o código GAME10.";
          feedbackEl.style.color = "#EF4444";
        }

        updateCartUI();
      });

      // Finalizar pedido no carrinho
      document.getElementById("checkoutBtn").addEventListener("click", () => {
        if (cart.length === 0) return;

        const feedbackEl = document.getElementById("checkoutFeedback");
        const orderNumber = Math.floor(100000 + Math.random() * 900000);

        feedbackEl.innerHTML = `
          <strong>Pedido #${orderNumber} registrado com sucesso!</strong><br />
          Nossa equipe enviará os detalhes de pagamento e entrega para o seu contato.
        `;
        feedbackEl.classList.remove("d-none");

        cart = [];
        activeCoupon = null;
        document.getElementById("couponInput").value = "";
        document.getElementById("couponFeedback").textContent = "";
        updateCartUI();
      });

      // Validação e envio interativo do formulário de contato
      const contactForm = document.getElementById("contactForm");
      const contactFeedbackAlert = document.getElementById("contactFeedbackAlert");

      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const subjectInput = document.getElementById("contactSubject");
        const messageInput = document.getElementById("contactMessage");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isNameValid = nameInput.value.trim().length >= 3;
        const isEmailValid = emailRegex.test(emailInput.value.trim());
        const isSubjectValid = subjectInput.value.trim() !== "";
        const isMessageValid = messageInput.value.trim().length >= 10;

        nameInput.classList.toggle("is-invalid", !isNameValid);
        nameInput.classList.toggle("is-valid", isNameValid);

        emailInput.classList.toggle("is-invalid", !isEmailValid);
        emailInput.classList.toggle("is-valid", isEmailValid);

        subjectInput.classList.toggle("is-invalid", !isSubjectValid);
        subjectInput.classList.toggle("is-valid", isSubjectValid);

        messageInput.classList.toggle("is-invalid", !isMessageValid);
        messageInput.classList.toggle("is-valid", isMessageValid);

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
          contactFeedbackAlert.className = "alert alert-danger";
          contactFeedbackAlert.textContent =
            "Verifique os campos destacados em vermelho antes de enviar sua mensagem.";
          contactFeedbackAlert.classList.remove("d-none");
          return;
        }

        const firstName = nameInput.value.trim().split(" ")[0];
        contactFeedbackAlert.className = "alert alert-success";
        contactFeedbackAlert.innerHTML = `
          <strong>Mensagem enviada com sucesso, ${firstName}!</strong> Nossa equipe responderá em breve para <strong>${emailInput.value.trim()}</strong>.
        `;
        contactFeedbackAlert.classList.remove("d-none");

        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });
      });
    });
  