let gpusData = [];

async function loadGPUs() {
    try {
        const response = await fetch('data/gpus.json');
        const data = await response.json();
        gpusData = data.gpus;
        displayGPUs(gpusData);
    } catch (error) {
        console.error('Erro ao carregar GPUs:', error);
        document.getElementById('gpuList').innerHTML = '<div class="alert alert-danger">Erro ao carregar dados</div>';
    }
}

function displayGPUs(gpus) {
    const container = document.getElementById('gpuList');
    
    if (gpus.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">Nenhuma GPU encontrada</div></div>';
        return;
    }
    
    container.innerHTML = gpus.map(gpu => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <img src="${gpu.image}" class="card-img-top" alt="${gpu.name}">
                <div class="card-body">
                    <h5 class="card-title">${gpu.name}</h5>
                    <p class="card-text">
                        <strong>Fabricante:</strong> ${gpu.brand}<br>
                        <strong>VRAM:</strong> ${gpu.vram} GB ${gpu.memory_type}<br>
                        <strong>Performance:</strong> ${gpu.performance_score}/100<br>
                        <strong>Preço:</strong> $${gpu.price}<br>
                        <strong>Lançamento:</strong> ${gpu.release_date}
                    </p>
                    <div class="progress mb-2">
                        <div class="progress-bar" style="width: ${gpu.performance_score}%"></div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm" onclick="showDetails(${gpu.id})">Ver Detalhes</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterGPUs() {
    const brand = document.getElementById('filterBrand').value;
    const minVRAM = parseInt(document.getElementById('vramFilter').value);
    
    let filtered = gpusData;
    
    if (brand !== 'all') {
        filtered = filtered.filter(gpu => gpu.brand === brand);
    }
    
    filtered = filtered.filter(gpu => gpu.vram >= minVRAM);
    
    displayGPUs(filtered);
}

function showDetails(id) {
    const gpu = gpusData.find(g => g.id === id);
    if (gpu) {
        alert(`${gpu.name}\n\nDetalhes:\nVRAM: ${gpu.vram}GB\nPerformance: ${gpu.performance_score}/100\nPreço: $${gpu.price}\nAno: ${gpu.release_date}`);
    }
}

document.getElementById('filterBrand').addEventListener('change', filterGPUs);
document.getElementById('vramFilter').addEventListener('input', (e) => {
    document.getElementById('vramValue').textContent = `${e.target.value} GB`;
    filterGPUs();
});

loadGPUs();
