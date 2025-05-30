//Quét cây từ gốc đến lá
function drawTree(ctx, person, x, y, level = 0) {
    if (!person) return;

    const boxWidth = 100;
    const boxHeight = 50;
    const boxX = x - boxWidth / 2;
    const boxY = y - boxHeight / 2;

    // Vẽ hình chữ nhật cho người
    ctx.fillStyle = person.gioiTinh === 1 ? 'lightblue' : 'lightpink';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Vẽ tên
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText(person.hoVaTenDem + ' ' + person.ten, x - 40, y + 5);

    // Vẽ đường kết nối với cha mẹ
    if (person.idCha > 0 || person.idMe > 0) {
        const parentX = x - (level * 50); // Giả sử cha mẹ nằm bên trái
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(parentX, y - 50); // Kết nối với cha mẹ
        ctx.stroke();
        drawTree(ctx, getPersonById(person.idCha), parentX, y - 50, level + 1);
        drawTree(ctx, getPersonById(person.idMe), parentX + 50, y - 50, level + 1);
    }
}